import { defineComponent } from "vue";
import { useData, useRoute, useRouter } from "vitepress";

export const BacklinkReferences = defineComponent({
  name: "BacklinkReferences",

  setup() {
    console.log("works?");

    const { page } = useData();
    const allBacklinks = page.value["backlinks"]; // ();
    console.log(allBacklinks);
    let r = useRouter();
    let route = useRoute();
    let backlinks = [];
    for (const backlink of allBacklinks) {
      if (`/${backlink.path}` == route.path) {
        // exclude self reference
        continue;
      }
      backlinks.push(backlink);
    }

    // TODO: Something's odd about that collection for the fuck sake

    return () => (
      <div class="backlinks-group">
        <h2 class="backlinks-header">
          {backlinks.length} Linkded Reference(s)
        </h2>
        {backlinks.length ? (
          <div class="backlinks">
            {backlinks.map((backlink) => {
              return (
                <div onClick={() => r.go(`/${backlink.path}`)} class="backlink">
                  <h2>{backlink.title}</h2>
                  <div class="backlink-body" v-html={backlink.content} />
                </div>
              );
            })}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  },
});
