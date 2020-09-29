<script>

    var chatMessages = [];
    var msg = '';

    const url = 'ws://localhost:3000/'
    const connection = new WebSocket(url)
    connection.onopen = () => {
        connection.send('*** Nueva conexión ***')
    }

    function send(txt){
        connection.send(txt)
    }

    connection.onmessage = msg => {
        console.log(msg.data)
        chatMessages = [...chatMessages, msg.data];
    }
</script>

<main>
    <div>
        {#each chatMessages as msg}
        <p>{msg}</p>
        {/each}
    </div>
    <input type="text" bind:value={msg}>
    <button on:click={send(msg)}>Send</button>
</main>

<style>
</style>