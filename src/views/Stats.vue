<template>
  <div>
    <span>
      <v-btn icon to="/"><v-icon>mdi-arrow-left-bold</v-icon></v-btn
      >Statistics
    </span>
    <v-card class="blue-grey darken-4">
      <v-card-text>
        <v-sparkline
          :smooth="16"
          :gradient="['#c4fff7', '#c1f80a']"
          :line-width="3"
          :value="value"
          auto-draw
          stroke-linecap="round"
        ></v-sparkline>
      </v-card-text>
    </v-card>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="data"
      :items-per-page="25"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>
import firebaseObj from "../firebase.js";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const gradients = ["#f72047", "#ffd200", "#1feaea"];

export default {
  data: () => ({
    value: [],
    gradientDirection: "top",
    data: [],
    loading: true,
    user: null,
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Type", value: "type" },
      { text: "Amount", value: "amount" },
      { text: "Purpose", value: "purpose" },
      { text: "User", value: "username" },
    ],
  }),
  beforeMount() {
    let date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var firstDayOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 2);
    let sdate = Timestamp.fromDate(firstDay);
    let edate = Timestamp.fromDate(firstDayOfNextMonth);

    let q = query(
      collection(firebaseObj.firestore, "transaction"),
      orderBy("date", "asc"),
      where("date", ">=", sdate),
      where("date", "<", firstDayOfNextMonth)
    );
    let unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((e) => {
        this.loading = false;
        if (e.type === "added") {
          this.data.push({ ...e.doc.data(), id: e.doc.id });
        }
        if (e.type === "modified") {
          let objIndex = this.data.findIndex((obj) => obj.id == e.doc.id);
          this.data = this.data.filter((item) => item.id !== e.doc.id);
          this.data.splice(objIndex, 0, { ...e.doc.data(), id: e.doc.id });
        }
        if (e.type === "removed") {
          this.data = this.data.filter((item) => item.id !== e.doc.id);
        }
      });
      this.value = this.data.map((e) => {
        // console.log(e.amount);
        return parseInt(e.amount);
      });
      // console.log(this.data);
    });

    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user;
      } else {
        console.log("Not Authenticated");
        this.user = null;
        this.$router.replace("/");
      }
    });
  },
};
</script>