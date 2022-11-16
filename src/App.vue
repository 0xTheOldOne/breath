<template>
  <div class="title">Breath</div>
  <div class="web">
    <div class="alert alert-info">This app is meant to be used on a smartphone or a tablet...</div>
  </div>
  <div class="mobile">
    <div class="router-view">
      <router-view />
    </div>
  </div>
</template>

<style lang="less">
  html,
  body {
    padding: 0px;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  html {
    body {
      background: url("./assets/background.jpg") center bottom no-repeat;
      background-size: cover;

      * {
        font-family: "Lobster Two", cursive;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: white;
        text-shadow: 0px 0px 10px fade(black, 50%);
        overflow: hidden;
      }

      .alert {
        font-family: Arial, Helvetica, sans-serif;
      }

      #app {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        .title {
          position: fixed;
          top: 10vw;
          width: 100%;
          text-align: center;
          font-size: 3rem;
        }

        .web {
          display: none;
        }

        .mobile {
          display: block;
        }
      }
    }
  }

  @media (min-width: 913px) {
    html {
      body {
        #app {
          .web {
            display: block;
          }

          .mobile {
            display: none;
          }
        }
      }
    }
  }
</style>
