<script lang="ts">
  import type { ITable } from "../types";
  import TableRow from "./TableRow.svelte";

  export let data: ITable = { rows: [], keys: [] };
</script>

<div>
  <table class="table">
    <thead>
      <tr>
        {#each data.keys as key}
          <th class="header-label">{key}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data.rows as row}
        <TableRow bind:data={row} bind:table={data}/>
      {/each}
    </tbody>
  </table>
</div>
