<script lang="ts">
	import Table from "./components/Table.svelte";
	import type { ITable, IProcessInfo } from "./types";
	import { service } from "./service";
    import FileList from "./components/FileList.svelte";
	import { onMount } from 'svelte';
    import { xlink_attr } from "svelte/internal";

	let userInfo = undefined;

	onMount(async () => (userInfo = await getUserInfo()));

	async function getUserInfo() {
		try {
			const response = await fetch('/.auth/me');
			const payload = await response.json();
			const { clientPrincipal } = payload;
			return clientPrincipal;
		} catch (error) {
			console.error('No profile could be found');
			return undefined;
		}
	}


	let editTable: ITable = { rows: [], keys: [] };
	let maxTableID=0;
	export let selectedTable: ITable = { rows: [], keys: [] }

	export let corrTable: ITable = { rows: [], keys: [] }

	export let loadCorrBaseTable: ITable = { rows: [], keys: [] }

	
	
	let files = [];

	$: selectedTable, max_width(selectedTable, 'view');
	
	$: if((corrTable.keys).length>0) { saveCorrTableFromAddNewRow()};


	function saveCorrTableFromAddNewRow() {
		service.loadCorr().then((response) => {
			if (response.ok) {
				response.json().then((result) => {
										
					let saveTableCorr: ITable = { rows: [], keys: [] }
					saveTableCorr.keys=corrTable.keys.splice(1,corrTable.keys.length)
					for (var i in corrTable.rows){
						saveTableCorr.rows.push({})
							for (var x in corrTable.rows[i]) {								
								if (x != "corr_row_id") {
									saveTableCorr.rows[i][x]= corrTable.rows[i][x]																		
								}
							}							   
						}
					if (result.length>0) {
						const keys =Object.keys(result[0]);									
						loadCorrBaseTable = { rows: result, keys: keys };
						saveTableCorr.rows=loadCorrBaseTable.rows.concat(saveTableCorr.rows);
					}					
					
					service.saveCorr(JSON.stringify(saveTableCorr.rows)).then((response) => {
						if (response.ok) {
							alert("Hozzáadás korrekció táblába sikeres!");
						}
					loadCorrTable();
		});

		corrTable={ rows: [], keys: [] };

				});
			}
		});

		
	}

	function saveCorr() {
		let saveTable={...editTable}
		saveTable.keys=saveTable.keys.splice(1,saveTable.keys.length)
		for (var i in saveTable.rows){
					delete saveTable.rows[i].editor_row_id
			}

		service.saveCorr(JSON.stringify(saveTable.rows)).then((response) => {
			if (response.ok) {
				alert("Korrekció tábla mentés sikeres!");
			}
		});
	}
 
	function loadCorrTable() {
		service.loadCorr().then((response) => {
			if (response.ok) {
				response.json().then((result) => {
					if (result.length>0) {
						const keys =["editor_row_id"].concat(Object.keys(result[0]));
						let rowsWithID = [...result];
						for (var i in rowsWithID){
							rowsWithID[i]=Object.assign({}, {"editor_row_id":(parseInt(i)+1).toString()}, rowsWithID[i])
						}
						editTable = { rows: rowsWithID, keys: keys };
						maxTableID=editTable.rows.length;
						max_width(editTable, 'edit');
					}
					else {alert("Korrekciós tábla nem található!")}
				});
			}
		});
	}

	function loadParameters() {
		service.loadParam().then((response) => {
			if (response.ok) {
				response.json().then((result) => {
					const keys =["editor_row_id"].concat(Object.keys(result[0]));
					let rowsWithID = [...result];
					for (var i in rowsWithID){
						rowsWithID[i]=Object.assign({}, {"editor_row_id":(parseInt(i)+1).toString()}, rowsWithID[i])
					}
					editTable = { rows: rowsWithID, keys: keys };
					maxTableID=editTable.rows.length;
					max_width(editTable, 'edit');
				});
			}
		});
	}

	function loadMapping() {
		service.loadMapping().then((response) => {
			if (response.ok) {
				response.json().then((result) => {
					const keys =["editor_row_id"].concat(Object.keys(result[0]));
					let rowsWithID = [...result];
					for (var i in rowsWithID){
						rowsWithID[i]=Object.assign({}, {"editor_row_id":(parseInt(i)+1).toString()}, rowsWithID[i])
					}
					editTable = { rows: rowsWithID, keys: keys };
					maxTableID=editTable.rows.length;
					max_width(editTable, 'edit');
				});
			}
		});
	}

	function newRow(){
		let maxTableID=Math.max(...editTable.rows.map(x=>parseInt(x["editor_row_id"])));
		let emptyRow={...editTable.rows[0]};
		for (var key in emptyRow){
			if (key=="editor_row_id"){
				maxTableID++;
				emptyRow[key]=(maxTableID).toString()
			}
			else
			emptyRow[key] = ""
		}
		editTable.rows.push(emptyRow);
		editTable=editTable;
	}


	let currentFolder: string
	function loadFiles(folder_nm) {
		service.listfiles({"folder" : folder_nm}).then(response => {
            if (response.ok) {
                response.json().then(result => {
                    files = result;
					currentFolder = folder_nm
                });
            }
        });
	}

	function load(table) {
		if (table=="parameter"){			
			loadParameters();				
		}
		else if (table=="mapping") {
			loadMapping();
		}
		else if (table=="corr") {
			loadCorrTable();
		}
	}

	function saveParam() {
		let saveTable={...editTable}
		saveTable.keys=saveTable.keys.splice(1,saveTable.keys.length)
		for (var i in saveTable.rows){
					delete saveTable.rows[i].editor_row_id
			}

		service.saveParam(JSON.stringify(editTable.rows)).then((response) => {
			if (response.ok) {
				alert("Mentés sikeres!");
			}
		});
	}

	let rowType:string;

	let min_width_class_edit:{};
	let min_width_class_view:{};
	let max_width_detail:Object[];
 

	function max_width(table, type){
		if (type=='view') {min_width_class_view=new Object();}	
		if (type=='edit') {min_width_class_edit=new Object();}	
		max_width_detail= new Array(new Object());
		for (var curr_key in table.keys){
			let max_td_width: number=0;
			for (var i in table.rows){
				//alert((table.keys[curr_key]).toString());
				//alert((table.rows[i][table.keys[curr_key]]).toString());
			if (max_td_width<table.rows[i][table.keys[curr_key]].length){
				max_td_width=table.rows[i][table.keys[curr_key]].length
				}			
			}
			max_width_detail.push({"key":table.keys[curr_key], "max_width": max_td_width}) 
			
			let width_class="";
			if (max_td_width>10) {
				width_class="td_min_100"
			}
			if (max_td_width>15) {
				width_class="td_min_150"
			}
			if (max_td_width>20) {
				width_class="td_min_200"
			}
			if (max_td_width>30) {
				width_class="td_min_300"
			}

			if (max_td_width>50) {
				width_class="td_min_500"
			}
		
			if (type=='view') {min_width_class_view[table.keys[curr_key]]= width_class;}	
			if (type=='edit') {min_width_class_edit[table.keys[curr_key]]= width_class;}	
		}
	}


	function saveMapping() {
		let saveTable={...editTable}
		saveTable.keys=saveTable.keys.splice(1,saveTable.keys.length)
		for (var i in saveTable.rows){
					delete saveTable.rows[i].editor_row_id
			}

		service.saveMapping(JSON.stringify(editTable.rows)).then((response) => {
			if (response.ok) {
				alert("Mentés sikeres!");
			}
		});
	}

</script>

<div id="main">
	<div id="container_1">
		{#if userInfo}
		<div class="user">
		<p>Welcome {userInfo && userInfo.userDetails} ({userInfo && userInfo.identityProvider})</p>
		</div>
		{/if}
		<h3>MM DB LOADER control panel</h3>
		<h4>Edit Parameters:</h4>
		<div class="paramButton" on:click={saveParam}>Save P</div>
		<div class="paramButton" on:click={() => load("parameter")}>Load P</div>

		<div class="paramButton" on:click={saveMapping}>Save M</div>
		<div class="paramButton" on:click={() => load("mapping")}>Load M</div>

		<div class="paramButton" on:click={saveCorr}>Save K</div>
		<div class="paramButton" on:click={() => load("corr")}>Load K</div>

		<div class="paramButton" on:click={newRow}>New row</div>

	</div>
	<div id="container_2">
		<Table bind:data={editTable} bind:min_width_class={min_width_class_edit} rowType="edit" bind:corrTable={corrTable}/>
	</div>

	<div id="container_3"><h4>View Files:</h4></div>
	<div id="container_4">
		<div id="container_4_1">
			<table class="table">
				<thead>
					<tr><th class="header-label">Folders</th></tr>
				</thead>				
				<tr><td><div class="td_Sel" on:click={() => loadFiles("load_to_DB")}>Load to DB</div></td></tr>
				<tr><td><div class="td_Sel" on:click={() => loadFiles("logs")}>Logs</div></td></tr>
				<tr><td><div class="td_Sel" on:click={() => loadFiles("output/biased_list")}>Output / Biased List</div></td></tr>
				<tr><td><div class="td_Sel" on:click={() => loadFiles("output/filmlist_imdbid")}>Output / Imdb List</div></td></tr>
				<tr><td><div class="td_Sel" on:click={() => loadFiles("output/filmlist_omdb")}>Output / Omdb List</div></td></tr>				
			</table>
		</div>
		<FileList bind:files={files} bind:folder={currentFolder} bind:selectedTable={selectedTable} bind:rowType={rowType}></FileList>
	</div>
	<div id="container_5" />
	<div id="container_6">
		<Table data={selectedTable} min_width_class={min_width_class_view} rowType={rowType} bind:corrTable={corrTable} />
	</div>

	<div id="container_7">MM - 2022</div>
	Dezsőkém
</div>
