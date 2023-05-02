<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import Home from "./routes/Home.svelte";
    import Chat from "./routes/Chat.svelte";
</script>

<Router>
    <main>
        <Route path="/">
            <Home />
        </Route>

        <Route path="chat">
            <Chat />
        </Route>
    </main>
</Router>
