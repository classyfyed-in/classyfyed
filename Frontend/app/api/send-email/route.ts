import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/encryption';
import { connectToDB } from '@/lib/mongodb';
import Verify from '@/models/Verify';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email, name } = await req.json();

  try {
    await connectToDB();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const verify = await Verify.findOneAndUpdate(
      { email },
      { $setOnInsert: { name, isVerified: false } },
      { upsert: true, new: true }
    );

    const payload = JSON.stringify({
      email,
      expiresAt: Date.now() + 1000 * 60 * 30, // valid 30 mins
    });

    const token = encrypt(payload);
    const verifyUrl = `https://www.classyfyed.in/api/verify?token=${encodeURIComponent(token)}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_USER!,
        pass: process.env.ZOHO_PASS!,
      },
    });

    await transporter.sendMail({
      from: `"Classyfyed" <${process.env.ZOHO_USER}>`,
      to: email,
      subject: 'Verify your email',
      html: `Click to verify: <a href="${verifyUrl}">Verify Now</a>`,
    });

    return NextResponse.json({ message: 'Verification email sent' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
