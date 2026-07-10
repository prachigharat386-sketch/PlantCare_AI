import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, name } = req.body;

    const { data, error } = await resend.emails.send({
      from: "PlantCare AI <onboarding@resend.dev>",
      to: [email],
      subject: "🌱 Welcome to PlantCare AI!",
      html: `
        <h2>Welcome ${name} 🌿</h2>
        <p>Thank you for signing up to <b>PlantCare AI</b>.</p>
        <p>Happy Gardening! 🌱</p>
      `,
    });

    if (error) {
      return res.status(400).json(error);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}