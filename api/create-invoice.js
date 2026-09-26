export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount, orderId, comment } = req.body;
  const apiKey = process.env.LAVA_API_KEY; // Ключ безопасно подтягивается из Vercel

  try {
    const response = await fetch('https://api.lava.ru/business/invoice/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({
        sum: amount,
        orderId: orderId || `order_${Date.now()}`,
        comment: comment || 'Покупка на D-Stack'
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка создания счета' });
  }
}