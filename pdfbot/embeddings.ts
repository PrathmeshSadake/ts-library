import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function generateEmbeddings(docs: any[]) {
  try {
    const res = await SupabaseVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY! }),
      {
        client: supabase,
        tableName: "cohort_bot",
        queryName: "match_cohort_bot",
      }
    );
    return { success: true, res };
  } catch (error) {
    console.log("from embedddings", error);
    return { success: false, error };
  }
}
