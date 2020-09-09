<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col md="11">
          <h1>Registration</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            delectus itaque perferendis iure, obcaecati earum quod quibusdam.
            Possimus asperiores natus debitis ut pariatur obcaecati quos maxime
            saepe, sed quidem cumque?
          </p>

          <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font mr-3">Attendees: {{ attendeesData.length }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            flat
            dense
            v-model="search"
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-search-web"
            label="Search"
            single-line
            class="mr-2 hidden-sm-and-down"
          ></v-text-field>
          </v-toolbar>

          <v-data-table
            :mobile-breakpoint="0"
            style="border:1px solid #e0e0e0;border-radius:5px;background:white;"
            :search="search"
            :loading="isLoading"
            :headers="headers"
            :items="attendeesData"
            :items-per-page="10"
            class="elevation-0 ma-0 pa-0 mt-3"
          >
            <template v-slot:item.name="{ item }">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                    :src="item.image"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="google-font"
                    v-html="item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="google-font"
                    v-html="item.email"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-slot:item.date="{ item }">
              <!-- {{item.date}} -->
              {{showDate(item.date)}}
            </template>
            <template v-slot:item.actions="{ item }">
              <!-- {{item.date}} -->
              <viewdata :data="item"/>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import viewdata from '@/components/common/viewAttendee'
import attendeesServices from "@/services/attendeesServices";
export default {
  name: "Registration",
  components: {viewdata},
  data: () => ({
    isLoading: true,
    search: "",
    attendeesData: [],
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
        width: "25%",
      },
      { text: "date", value: "date" },
      { text: "Coupen Code", value: "code" },
      { text: "Email Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  mounted() {
    this.showData();
  },
  methods: {
    showDate(e){
      return e.toDate().toLocaleString()
    },
    showData() {
      this.attendeesData = [];
      this.isLoading = true;
      attendeesServices
        .getAllAttendees()
        .then((res) => {
          if (res.success == true) {
            this.attendeesData = res.data;
            // console.log(this.attendeesData)
            this.isLoading = false;
          }
        })
        .catch((e) => {
          console.log("Error getting documents", e);
        });
    },
  },
};
</script>
