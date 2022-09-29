$(document).ready(function () {
  const url = "http://localhost:3000/admin";

  $.getJSON(`${url}/fetch_all_types`, function (data) {
    //alert(JSON.stringify(data));
    data.types.map((item) => {
      $("#foodid").append($("<option>").text(item.foodtype).val(item.foodid));
    });
  });

  $.getJSON(`${url}/fetch_all_categories`, function (data) {
    //alert(JSON.stringify(data));
    data.category.map((item) => {
      $("#foodcategory").append(
        $("<option>").text(item.category).val(item.category)
      );
    });
  });

  $("#foodcategory").change(function () {
    $.getJSON(
      `${url}/fetch_all_categories`,
      { foodcategory: $("#foodcategory").val() },
      function (data) {
        $("#foodsubcategory").empty();
        $("#foodsubcategory").append(
          $("<option>").text("--Choose SubCategory--")
        );

        data.category.map((item) => {
          $("#foodsubcategory").append(
            $("<option>").text(item.subcategory).val(item.subcategory)
          );
        });
      }
    );
  });
});
