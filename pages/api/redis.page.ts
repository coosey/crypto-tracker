export default async function handler(req, res) {
  const { method, body } = req;

  try {
    // ========== GET ==============
    if (method === 'GET') {
      const { value } = body;
      res.status(200).json({ value });
    }
    // ========== POST =============
    else if (method === 'POST') {
      res.status(200).json({ success: true, message: 'Data saved successfully!' });
    }
  } catch (error) {
    console.error('Error in Redis API handler >>>', error);
    res.status(500).send(error);
  }
}