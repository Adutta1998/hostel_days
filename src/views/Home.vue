<template>
  <div>
    <v-card class="green lighten-5 mb-10">
      <v-card-title>Add Fund Section</v-card-title>
      <v-card-text>
        <h4>Amount</h4>
        <v-text-field
          filled
          label="Amount in Rs."
          color="green"
          :disabled="user == null"
          v-model="fund.amount"
        ></v-text-field>
        <v-btn
          rounded
          color="green"
          dark
          @click="addTransaction('fund')"
          :disabled="user == null"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>

    <v-card class="red lighten-5">
      <v-card-title>Expense Section</v-card-title>
      <v-card-text>
        <h4>Amount</h4>
        <v-text-field
          filled
          label="Amount in Rs."
          color="red"
          v-model="expense"
        ></v-text-field>
        <v-text-field
          filled
          :disabled="user == null"
          label="Purpose"
          color="red"
          v-model="fund.purpose"
        ></v-text-field>
        <v-btn
          rounded
          color="red"
          dark
          @click="addTransaction('expense')"
          :disabled="user == null"
        >
          <v-icon>mdi-delete-forever</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
    <v-snackbar timeout="2500" v-model="snackbar"
      >{{ fund.amount }} Added
    </v-snackbar>
  </div>
</template>

<script>
import firebaseObj from "../firebase.js";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
export default {
  name: "Home",
  data: () => ({
    user: null,
    fund: { amount: "", purpose: "" },
    expense: "",
    snackbar: false,
    text: `Hello, I'm a snackbar`,
  }),
  components: {},
  mounted() {},

  methods: {
    async addTransaction(type) {
      let data = {
        type: type,
        amount: this.fund.amount,
        user: this.user.uid,
        username: this.user.displayName,
        date: serverTimestamp(),
      };
      if (type == "expense") {
        data["purpose"] = this.fund.purpose;
        data["amount"] = this.expense;
      }
      let docRef = await addDoc(
        collection(firebaseObj.firestore, "transaction"),
        data
      );
      this.snackbar = true;
    },
  },
  beforeMount() {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user;
      } else {
        console.log("Not Authenticated");
        this.user = null;
      }
    });
  },
};
</script>
