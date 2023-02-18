async function createOrder(data) {
  await fetch('http://localhost:5000/api/orders', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data)
  }).then(response => response.json())
}

export default async (req, res) => {
  const { method } = req;
  if (method === 'POST') {
    const { items, email, name, bill_amount, phone_number } = req.body;
    try {
      await createOrder({
        items: items.map((item) => `${item.name} = ${item.quantity}`).toString(),
        name,
        email,
        phone_number,
        bill_amount,
        status: "Pending"
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
    return res.status(200).json({ message: `successfully added new order` });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
