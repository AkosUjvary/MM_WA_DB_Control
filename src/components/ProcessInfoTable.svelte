<script lang="ts">
    import type { IProcessInfo } from "../types";

    export let processInfos: IProcessInfo[] = [];
</script>

<div>
    <table class="table">
        <thead>
            <tr>
                <th class="header-label">process Id</th>
                <th class="header-label">type</th>
                <th class="header-label">datetime</th>
            </tr>
        </thead>
        <tbody>
            {#each processInfos as processInfo}
                <tr>
                    <td>{processInfo.id}</td>
                    <td>{processInfo.type}</td>
                    <td>{processInfo.datetime}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
