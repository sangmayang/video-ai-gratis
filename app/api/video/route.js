import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Model paling hemat / gratisan di fal.ai
    const result = await fal.subscribe("fal-ai/wan/v2.2-a14b/text-to-video", {
      input: { prompt },
    });

    return Response.json(result.data);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
