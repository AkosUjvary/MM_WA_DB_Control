<script lang="ts">
  import type { ITable } from "../types";
  import TableRow from "./TableRow.svelte";
  import { onMount } from 'svelte';

  export let data: ITable = { rows: [], keys: [] };

  export let corrTable: ITable = { rows: [], keys: [] };

  export let rowType: string;

  export let min_width_class;


</script>

<div>
  <table class="table">
    <thead>
      <tr>
        {#each data.keys as key}
          <th class="header-label {min_width_class[key]}">{key.replace("editor_row_id", "").replace("corr_row_id", "")}</th>     
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data.rows as row}
        <TableRow bind:data={row} bind:table={data} rowType={rowType} bind:corrTable={corrTable}/>
      {/each}
    </tbody>
  </table>
</div>
