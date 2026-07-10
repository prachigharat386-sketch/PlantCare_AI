import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { email, name } = req.body;

    const data = await resend.emails.send({
      from: "PlantCare AI <onboarding@resend.dev>",
      to: email,
      subject: "🌱 Welcome to PlantCare AI!",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Welcome ${name || "User"}! 🌿</h2>

          <p>Thank you for joining <b>PlantCare AI</b>.</p>

          <p>
            You can now manage your plants,
            get AI care tips,
            and keep your plants healthy.
          </p>

          <p>Happy Gardening! 🌱</p>
        </div>
      `,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}