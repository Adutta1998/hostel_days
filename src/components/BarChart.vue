
<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["labels", "chartData", "label", "options", "borderColors"],
  mounted() {
    console.log(this.$props);
    let chartData = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          label: this.$props.label,
          data: this.$props.chartData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: this.$props.borderColors,
          borderWidth: 5,
        },
      ],
    };
    let options = this.$props.options;
    this.renderChart(chartData, options);
  },
};
</script>