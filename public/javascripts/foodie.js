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
      $("#foodcategoryid").append(
        $("<option>").text(item.foodcategoryname).val(item.foodcategoryid)
      );
    });
  });

  $("#foodcategoryid").change(function () {
    $.getJSON(
      `${url}/fetch_all_subcategories`,
      { foodcategoryid: $("#foodcategoryid").val() },
      function (data) {
        $("#foodsubcategoryid").empty();
        $("#foodsubcategoryid").append(
          $("<option>").text("--Choose SubCategory--")
        );

        data.subcategory.map((item) => {
          $("#foodsubcategoryid").append(
            $("<option>")
              .text(item.foodsubcategoryname)
              .val(item.foodsubcategoryid)
          );
        });
      }
    );
  });
});
