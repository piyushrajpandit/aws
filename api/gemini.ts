import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
];

const STATUTORY_PROMPT = `You are an official Legal Metrology Compliance Officer under the Legal Metrology Act, 2009 & Packaged Commodities Rules, 2011 (Rule 6).
Analyze this packaged product photo very carefully and extract all statutory declarations.

CRITICAL INSTRUCTIONS:
- Extract ONLY what is visibly printed on the packaging in this image.
- If a field is NOT visible, set its value to null and the corresponding "Found" flag to false.
- DO NOT invent, assume, or hallucinate any missing data.
- If you see MRP (e.g. ₹35, Rs. 150), extract it and set mrpFound: true.
- If you see Net Quantity (e.g. 150 g, 1 kg, 40g), extract it.
- If you see Manufacturer name/address, extract it.
- If you see Customer Care phone/email, extract it.
- If you see Manufacturing Date, Expiry Date, Batch Number, extract them.

Return ONLY a valid JSON object:
{
  "productName": "string or null",
  "brand": "string or null",
  "netQuantity": "e.g. 40g or null",
  "mrp": "e.g. ₹20.00 or null",
  "mrpFound": true,
  "unitSalePrice": "e.g. ₹0.50/g or null",
  "uspFound": false,
  "manufacturer": "string or null",
  "address": "string or null",
  "mfgFound": true,
  "customerCare": "phone or email or null",
  "careFound": true,
  "countryOfOrigin": "e.g. India or null",
  "originFound": true,
  "manufacturingDate": "e.g. 08/2026 or null",
  "expiryDate": "e.g. 02/2027 or null",
  "batchNumber": "string or null",
  "barcode": "string or null",
  "rawDetectedText": "full transcript of all readable text on the pack",
  "isBlurry": false,
  "imageQualityRemarks": "Sharp and legible"
}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { dataUrl, apiKey: clientApiKey } = req.body || {};
  const apiKey =
    clientApiKey ||
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    '';

  if (!apiKey || apiKey.trim().length < 10) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  if (!dataUrl) {
    return res.status(400).json({ error: 'dataUrl is required' });
  }

  // Parse base64 from dataUrl
  const parts = dataUrl.split(',');
  const header = parts[0] || 'data:image/jpeg;base64';
  const base64 = parts[1] || '';
  const mimeMatch = header.match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

  const payload = {
    contents: [
      {
        parts: [
          { text: STATUTORY_PROMPT },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64,
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      response_mime_type: 'application/json',
    },
  };

  let lastError = '';

  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const resJson = await response.json();
        const text = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const data = JSON.parse(text);
          return res.status(200).json({ status: 'success', data, model });
        }
      } else {
        const errText = await response.text();
        lastError = `Model ${model} returned ${response.status}: ${errText}`;
        console.warn(`[Gemini API] ${lastError}`);
      }
    } catch (err) {
      lastError = `Model ${model} error: ${err instanceof Error ? err.message : String(err)}`;
      console.warn(`[Gemini API] ${lastError}`);
    }
  }

  return res.status(500).json({
    error: 'All Gemini models failed',
    details: lastError,
  });
}
