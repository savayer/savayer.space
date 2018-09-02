<template>
  <div class="wrapper">
    <div class="background-slides"></div> 
    <div class="overlay">
      <div class="overlay__stars"></div>
    </div>
    <section id="block-left">
      <div class="content">
        <h1>Hi, there!</h1>
        <p>I'm Junior frontend-developer. It's my homepage, where i write some posts for myself about developing, english language, etc.</p>
        <router-link to="/"><button class="btn btn-white">
          Hide Informations 
        </button></router-link>
      </div>
      
    </section>
    <transition name="slide">
      <section class="sidebar">
        <header>
          <router-link to="/">
            <span class="icon-cancel-circle close"></span>
          </router-link>
        </header>
        
        <div class="content">
            <h1>it's my first experince with SPA</h1>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus architecto a cum. Eligendi, a id! Aliquam quis cumque beatae doloremque, ipsa, quaerat sunt voluptatum iure hic sequi, provident adipisci.</p>
        </div>
      </section>
    </transition>
  </div>
</template>
