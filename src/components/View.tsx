import { client } from "@/sanity/lib/client";
import { STARTUP_COUNT_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write_client";

const View = async ({ id: startupId }: { id: string }) => {
  const { views: views_count, _id } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_COUNT_QUERY, { id: startupId });
  await writeClient
    .patch(_id)
    .set({ views: views_count + 1 })
    .commit();
  return (
    <div className="relative flex items-cetner px-2 py-1 justify-center w-full h-full">
      <span className="absolute -right-1 -top-1 bg-primary animate-ping rounded-full w-3 h-3" />
      <span className="absolute -right-1 -top-1 bg-primary rounded-full w-3 h-3" />
      <div className="font-work-sans font-semibold">Views: {views_count}</div>
    </div>
  );
};

export default View;
