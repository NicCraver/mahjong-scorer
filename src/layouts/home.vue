<template>
  <main flex-1>
    <RouterView />
    <Footer />
  </main>
  <footer class="footer">
    <Tabbar />
  </footer>
</template>

  <style scoped>
  .footer {
    width: 100%;
    height: 85px;
    padding: 0 10px;
  }
  </style>
