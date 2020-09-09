<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col md="11">
          <v-container>
            <v-row>
              <v-col md="2">
                <div
                  class="pa-3 text-center"
                  style="border:1px solid #e0e0e0;border-radius:5px;background:white"
                >
                  <h1>{{ count }}</h1>
                  Registration
                </div>
              </v-col>
              <v-col md="3">
                <div
                  class="pa-3"
                  style="border:1px solid #e0e0e0;border-radius:5px;background:white"
                >
                  <b>Gender</b>
                  <pie-chart
                    :download="true"
                    :data="[
                      ['Female', female],
                      ['Male', male],
                      ['Not Prefer to say', nogender],
                    ]"
                  ></pie-chart>
                </div>
              </v-col>
              <v-col md="3">
                <div
                  class="pa-3"
                  style="border:1px solid #e0e0e0;border-radius:5px;background:white"
                >
                  <b>Experience</b>
                  <pie-chart
                    :download="true"
                    :data="[
                      ['0 - 5 years', exp.alevel],
                      ['6 - 10 years', exp.blevel],
                      ['11 - 20 years', exp.clevel],
                      ['21+ years', exp.dlevel],
                    ]"
                  ></pie-chart>
                </div>
              </v-col>
              <!-- <v-col md="3">
                <div class="pa-3" style="border:1px solid #e0e0e0;border-radius:5px;background:white">
                  <b>Interest</b>
                  <p class="mb-0">Mobile: {{interest.mobile}} => {{getPercentage(count, interest.mobile)}}%</p>
                  <p class="mb-0">Cloud: {{interest.cloud}} => {{getPercentage(count, interest.cloud)}}%</p>
                  <p class="mb-0">Web: {{interest.web}} => {{getPercentage(count, interest.web)}}%</p>
                  <p class="mb-0">ML: {{interest.ml}} => {{getPercentage(count, interest.ml)}}%</p>
                  <p class="mb-0">Design: {{interest.design}} => {{getPercentage(count, interest.design)}}%</p>
                </div>
              </v-col> -->
              <v-col cols="12" md="4">
                <div
                  class="pa-3"
                  style="border:1px solid #e0e0e0;border-radius:5px;background:white"
                >
                <!-- <line-chart :data="chartData"></line-chart> -->
                <p>Country Wise</p>
                <bar-chart :data="CountryWiseData" :stacked="true"></bar-chart>
                </div>
                <!-- <geo-chart :data="[CountryWiseData]"></geo-chart> -->
              </v-col>
              <v-col cols="12" md="12">
                <div
                  class="pa-3"
                  style="border:1px solid #e0e0e0;border-radius:5px;background:white"
                >
                <!-- <line-chart :data="chartData"></line-chart> -->
                <p>Community Wise</p>
                <column-chart :data="CommunityWiseData" :stacked="true"></column-chart>
                </div>
                <!-- <geo-chart :data="[CountryWiseData]"></geo-chart> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- {{adata}} -->
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import attendeesServices from "@/services/attendeesServices";
export default {
  name: "Home",
  components: {},
  mounted() {
    this.showData();
  },

  data: () => ({
    CountryWiseData:[],
    CommunityWiseData:[],
    ThemeWiseData:[],
    chartData: [
      ["Jan", 4],
      ["Feb", 2],
      ["Mar", 10],
      ["Apr", 5],
      ["May", 3],
    ],
    count: 0,
    isLoading: false,
    adata: [],
    female: 0,
    male: 0,
    nogender: 0,
    exp: {
      alevel: 0,
      blevel: 0,
      clevel: 0,
      dlevel: 0,
    },
    interest: {
      mobile: 0,
      cloud: 0,
      web: 0,
      ml: 0,
      design: 0,
    },
  }),
  methods: {
    getPercentage(c, v) {
      return ((v / c) * 100).toFixed(2);
    },
    groupbydate(array, key) {
      return array.reduce((result, currentValue) => {
       (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
    },
    showData() {
      this.count = 0;
      this.isLoading = true;
      this.CountryWiseData = []
      this.CommunityWiseData = []
      attendeesServices
        .getAllAttendees()
        .then((res) => {
          if (res.success == true) {
            this.count = res.data.length;
            this.isLoading = false;
            this.adata = res.data;

            let gpdata = this.groupbydate(this.adata,'country')
            let communitygpdata = this.groupbydate(this.adata,'code')

            Object.keys(gpdata).forEach(res=>{
              let tempArray = []
              tempArray[0]=res
              tempArray[1]=gpdata[res].length
              this.CountryWiseData.push(tempArray)
            })

            Object.keys(communitygpdata).forEach(res=>{
              let tempArray = []
              tempArray[0]=res
              tempArray[1]=communitygpdata[res].length
              this.CommunityWiseData.push(tempArray)
            })

            // Gender
            this.female = this.adata.filter(
              (res) => res.gender === "Female"
            ).length;
            this.male = this.adata.filter(
              (res) => res.gender === "Male"
            ).length;
            this.nogender = this.adata.filter(
              (res) => res.gender === "Prefer not to say"
            ).length;

            // Experience
            this.exp.alevel = this.adata.filter(
              (res) => res.experience === "0 - 5 years"
            ).length;
            this.exp.blevel = this.adata.filter(
              (res) => res.experience === "6 - 10 years"
            ).length;
            this.exp.clevel = this.adata.filter(
              (res) => res.experience === "11 - 20 years"
            ).length;
            this.exp.dlevel = this.adata.filter(
              (res) => res.experience === "21+ years"
            ).length;
          }
        })
        .catch((e) => {
          console.log("Error getting documents", e);
        });
    },
  },
};
</script>
