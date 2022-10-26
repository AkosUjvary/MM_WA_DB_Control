<script lang="ts">
    import type { IParamTableRow } from "../types";

    export let data: IParamTableRow;
</script>

<tr class="tr-inputs">
    {#each Object.keys(data) as key}
        <th><div><input type="string" bind:value={data[key]} /></div></th>
    {/each}
</tr>
