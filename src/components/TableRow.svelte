<script lang="ts">
    import type { ITableRow } from "../types";
    import type { ITable } from "../types";

    export let data: ITableRow;
    export let table: ITable = { rows: [], keys: [] };
    export let rowType: string;

    function deleteRow(id) {
		table.rows=table.rows.filter(x=>x["editor_row_id"]!=id.toString());
        table=table;
	}


</script>

<tr class="tr-inputs">
    {#if rowType == "edit"}
        <th><div on:click={() => deleteRow(data["editor_row_id"])}>-</div></th>
    {/if}
    {#each Object.keys(data) as key}
    {#if key != "editor_row_id"}
        <th><div><input type="string" bind:value={data[key]} /></div></th>
    {/if}
    {/each}
</tr>
