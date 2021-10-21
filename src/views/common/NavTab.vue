<template>
  <div id="navTab">
    <nav>
      <ul>
        <li v-for="item in tabItems"
            :key="item.slotname"
            class="tab-item"
            :class="{'active': current === item.slotname}"
            @click="setCurrent(item.slotname)">
            {{ item.name }}
        </li>
      </ul>
    </nav>
    <div class="tab-body">
      <section class="slots-container">
        <div class="filters">
          <slot v-if="current === 'singleproject'"></slot>
        </div>
        <slot :name="current"></slot>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavTab',
  props: ['tabItems', 'selectedItem'],
  data() {
    return {
      current: this.selectedItem
    }
  },
  methods: {
    setCurrent(slotname) {
      this.current = slotname;
    }
  },
  mounted() {
    this.current = this.tabItems?.length ? this.tabItems[0].slotname : this.selectedItem
  },
  computed: {
    // currentTab() {
    //   if (this.selectedItem) {
    //     return this.selectedItem
    //   } else {
    //     return this.this.current;
    //   }
    // }
  }
}
</script>

<style scoped>
 #sidenav {
    width: 100%;
    height: 100vh;
    background-color: #09a746;
    display: flex;
    align-items: center;
    overflow: hidden;
 }

  nav {
    text-transform: uppercase;
    width: 100%;
  }
  
  ul {
    display: flex;
    justify-content: center;
  }

  .tab-item {
    list-style: none;
    font-size: 14px;
    font-weight: 600;
    padding: 18px 20px;
    cursor: pointer;
    margin-top: 2px;
    border-bottom: 1px solid #34495E
  }


  .tab-item:hover, .tab-item.active{
    border-bottom: 2px solid #09a746;
    color: #09a746;
  }

  .tab-body {
    display: flex;
    justify-content: center;
  }

  .slots-container {
    width: 950px;
  }

  .filters {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>