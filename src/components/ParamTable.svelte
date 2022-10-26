<script lang="ts">
  import type { IParamTable } from "../types";
  import ParamTableRow from "./ParamTableRow.svelte";

  export let data: IParamTable = { rows: [], keys: [] };
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
        <ParamTableRow data={row} />
      {/each}
    </tbody>
  </table>
</div>
