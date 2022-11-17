<script lang="ts">
    import type { ITableRow } from "../types";

    export let data: ITableRow;
</script>

<tr class="tr-inputs">
    {#each Object.keys(data) as key}
        <th><div><input type="string" bind:value={data[key]} /></div></th>
    {/each}
</tr>
