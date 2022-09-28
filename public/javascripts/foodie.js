$(document).ready(function () {
  const url = "http://localhost:3000";

  $.getJSON(`${url}/admin/fetch_all_types`, function (data) {
    alert(JSON.stringify(data));
    data.category.map((item) => {
      $("#foodid").append($("<a>").text(item.foodtype).val(item.foodid));
    });

    $("#foodid").formSelect();
  });

  $("#categoryid").change(function () {
    $.getJSON(
      `${url}/product/fetch_all_subcategories`,
      { categoryid: $("#categoryid").val() },
      function (data) {
        $("#subcategoryid").empty();
        $("#subcategoryid").append($("<option>").text("Select Sub-Category"));

        data.subcategory.map((item) => {
          $("#subcategoryid").append(
            $("<option>").text(item.subcategoryname).val(item.subcategoryid)
          );
        });

        $("#subcategoryid").formSelect();
      }
    );
  });

  $("#categoryid").change(function () {
    $.getJSON(
      `${url}/product/fetch_all_brands`,
      { categoryid: $("#categoryid").val() },
      function (data) {
        $("#brandid").empty();
        $("#brandid").append($("<option>").text("Select Brand"));

        data.brand.map((item) => {
          $("#brandid").append(
            $("<option>").text(item.brandname).val(item.brandid)
          );
        });

        $("#brandid").formSelect();
      }
    );
  });
});
