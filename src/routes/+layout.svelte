<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';
    import { setFavoritesContext } from '$lib/stores/favorites';
    import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';

    setFavoritesContext();
</script>

<Navbar let:NavContainer color="primary">
    <NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
        <NavBrand href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold">SvelteKit Capacitor PoC</span>
        </NavBrand>

        <div class="flex items-center md:order-2">
            <NavHamburger />
        </div>

        <NavUl activeUrl={$page.url.pathname}>
            <NavLi href="/">home</NavLi>
            <NavLi href="/search">search</NavLi>
            <NavLi href="/fav">fav</NavLi>
            <NavLi href="/chart">chart</NavLi>
            <NavLi href="/map">map</NavLi>
            <NavLi href="/kitchen-sink">kitchen sink</NavLi>
        </NavUl>
    </NavContainer>
</Navbar>

<div class="container mx-auto px-2">
    <slot />
</div>
