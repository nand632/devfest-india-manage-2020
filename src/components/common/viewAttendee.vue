<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            dark
            color="primary"
            @click.stop="dialog = true"
          >
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <span>View {{ data.name }}</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline">{{ data.name }} Details</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col md="4" class="text-center">
              <v-avatar size="90">
                <v-img :src="data.image"></v-img>
              </v-avatar>
              <h2 class="my-0 mt-5">{{ data.name }}</h2>
              <p class="my-1">{{ data.email }}</p>
              <p class="my-0">{{ data.city }}, {{ data.country }}</p>
            </v-col>
            <v-col md="8">
              <p class="mb-0 mt-2"><b>Role & Organization:</b></p>
              <p class="my-0">{{ data.role }}, {{ data.org }}</p>

              <p class="mb-0 mt-2"><b>Gender:</b></p>
              <p class="my-0">{{ data.gender }}</p>

              <p class="mb-0 mt-2"><b>Year of Experience:</b></p>
              <p class="my-0">{{ data.experience }}</p>

              <p class="mb-0 mt-2"><b>Coupen Code:</b></p>
              <p class="my-0">{{ data.code }}</p>

              <p class="mb-0 mt-2" v-if="data.status"><b>Email Status:</b></p>
              <p class="my-0" v-if="data.status">{{ data.status }}</p>

              <p class="mb-0 mt-4"><b>Theme/Traks Interest:</b></p>
              <span>
                <v-chip
                  label
                  class="mr-2"
                  small
                  v-for="(item, i) in data.theme"
                  :key="i"
                >
                  {{ item }}
                </v-chip>
              </span>

              <p class="mb-0 mt-4">
                <b>How did you get to know about this event?:</b>
              </p>
              <span>
                <v-chip
                  label
                  class="mr-2"
                  small
                  v-for="(item, i) in data.knowAbout"
                  :key="i"
                >
                  {{ item }}
                </v-chip>
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false">
          Disagree
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {},
};
</script>
