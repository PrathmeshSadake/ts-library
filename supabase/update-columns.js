import { createClient } from "@supabase/supabase-js";

async function UpdateColumns() {
  console.log("starting...");
  const supabase = createClient(
    "https://<YOUR_SUPABASE_URL>.supabase.co",
    "ANON_KEY"
  );

  console.log("fetching data...");
  const { data, error } = await supabase
    .from("db_grade3_math")
    .select("id, metadata");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("updating columns...");
  for (const row of data) {
    const { grade, topic, subject } = row.metadata;

    await supabase
      .from("db_grade3_math")
      .update({ grade, topic, subject })
      .match({ id: row.id });
    console.log("updated row:", row.id);
  }
  console.log("done!");
}
UpdateColumns();
