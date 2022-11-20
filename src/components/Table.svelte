<script lang="ts">
  import type { ITable } from "../types";
  import TableRow from "./TableRow.svelte";

  export let data: ITable = { rows: [], keys: [] };
  export let rowType: string;


</script>

<div>
  <table class="table">
    <thead>
      <tr>
        {#each data.keys as key}
          <th class="header-label">{key.replace("editor_row_id", "")}</th>        
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data.rows as row}
        <TableRow bind:data={row} bind:table={data} rowType={rowType}/>
      {/each}
    </tbody>
  </table>
</div>
