<script lang="ts">
    import type { ITableRow } from "../types";
    import type { ITable } from "../types";

    export let data: ITableRow;
    export let table: ITable = { rows: [], keys: [] };
    export let corrTable: ITable = { rows: [], keys: [] };
    export let rowType: string;
 
    function deleteRow(id) {
		table.rows=table.rows.filter(x=>x["editor_row_id"]!==id);
        table=table;
	}

    function addRow(id) {	
        corrTable.keys=table.keys;
        let c_table={...table}
        corrTable.rows=corrTable.rows.concat(c_table.rows.filter(x=>x["corr_row_id"]===id));
        let d_table={...table}
        corrTable=corrTable;
	}


</script>

<tr class="tr-inputs">
    {#if rowType == "edit"}
        <th><div class="td_Del" on:click={() => deleteRow(data["editor_row_id"])}>-</div></th>
    {/if}
    {#if rowType == "corr"}
        <th><div class="td_Del" on:click={() => addRow(data["corr_row_id"])}>+</div></th>
    {/if}
    {#each Object.keys(data) as key}
    {#if key != "editor_row_id" && key != "corr_row_id" }                
            <th><div><input type="string" bind:value={data[key]} /></div></th>
    {/if}
    {/each}
</tr>
