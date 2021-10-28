<template>
  <div id="project-planner">
    <h3 class="title">PROJECT PLANNER</h3>
    <p class="title-info">(Forms & data binding / Vue router basics / Fetching data)</p>

    <section v-if="!isLoading"></section>
    <section v-else>
        <Spinner />
    </section>
    <NavTab :tabItems="tabItems" :selectedItem="currentTab">

      <FilterNav @filterChange="current= $event" :current="current" />
      
      <template v-slot:singleproject>
        <div v-if="projects.length" class="slot-container">
          <div v-for="project in filteredProjects" :key="project.id">
            <SingleProject :project="project" @delete="handleDelete" @complete="handleComplete" />
          </div>
        </div>
      </template>

      <template v-slot:addproject>
        <div class="slot-container">
          <AddProject @added="handleAdd" />
        </div>
      </template>
    </NavTab>
  </div>
</template>

<script>
import SingleProject from '../session5-8/components/SingleProject.vue'
import AddProject from '../session5-8/components/AddProject.vue'
import NavTab from '../common/NavTab.vue'
import FilterNav from '../session5-8/components/FilterNav.vue'
import { firestoreService } from '../../firebase/config'
import Spinner from '../session9-12/components/Spinner.vue'

export default {
  name: 'ProjectPlanner',
  components: {
    SingleProject,
    AddProject,
    NavTab,
    FilterNav,
    Spinner
    },
  data() {
    return {
      isLoading: true,
      tabItems: [],
      projects: [],
      current: 'all',
      currentTab: 'singleproject',
    };
  },
  mounted() {
    this.initTabItems()
    this.getAllProjects()
  },
  methods: {
    getAllProjects() {
      const getProjects =  async () => {
      await firestoreService.collection('projects')
              .get()
              .then( data => {
                this.projects = data.docs.map( doc => {
                  this.isLoading = false;
                  return { ...doc.data(), id: doc.id}
                })  
                })
      }
      getProjects()
    },
    initTabItems() {
      this.tabItems = [
        {id: 1, name: 'Projects', slotname: 'singleproject'},
        {id: 2, name: 'Add a  new project', slotname: 'addproject'}
      ]
    },
    handleDelete(id) {
      this.isLoading = true
      this.projects = this.projects.filter(project => {
        return project.id !== id
      })
      this.isLoading = false
    },
    handleComplete(id) {
      this.isLoading = true
      let p = this.projects.find(project => {
        return project.id === id
      })
      p.complete = !p.complete
      this.isLoading = false
    },
    handleAdd(isOk) {
      if (isOk) {
        this.isLoading = true
        this.currentTab = 'singleproject'
        this.getAllProjects()
      }
    }
  },
  computed: {
    filteredProjects() {
      if (this.current === 'completed') {
        return this.projects.filter(project => project.complete)
      }
      if (this.current === 'ongoing') {
        return this.projects.filter(project => !project.complete)
      }
      return this.projects
    }
  },
}
</script>

<style scoped>
  .slot-container {
    margin-top: 20px;
  }
</style>