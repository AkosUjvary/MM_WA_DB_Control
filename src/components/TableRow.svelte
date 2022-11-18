<script lang="ts">
    import type { ITableRow } from "../types";
    import type { ITable } from "../types";

    export let data: ITableRow;
    export let table: ITable = { rows: [], keys: [] };

    function deleteRow(id) {
		table.rows.filter(x=>x["editor_row_id"]=='2');
        table=table;
	}


</script>

<tr class="tr-inputs">
    <th><div on:click={() => deleteRow(data["editor_row_id"])}>{data["editor_row_id"]}</div></th>
    {#each Object.keys(data) as key}
    {#if key != "editor_row_id"}
        <th><div><input type="string" bind:value={data[key]} /></div></th>
    {/if}
    {/each}
</tr>
