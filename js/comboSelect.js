comboConfig = typeof comboConfig === "undefined" ? {} : comboConfig;

function showOptions($option_Select) {
    hideOptions($(".option-select[data-selec-open='true']"));
    $option_Select.find("ul").slideDown();
    $option_Select.attr("data-selec-open", "true");
    $option_Select.find(".select-title .bbva-icon").css({
        'transform': 'rotate(180deg)',
        'top': '38%'
    })
}

function hideOptions($option_Select) {
    $option_Select.find("ul").slideUp();
    $option_Select.attr("data-selec-open", "false");
    $option_Select.find(".select-title .bbva-icon").css({
        'transform': 'rotate(0deg)',
        'top': '30%'
    })
}

function resetCombo($parent_Select) {
    $opSel = $parentSelect.find(".option-select");
    if ($opSel.attr("data-type") == "animated") {
        $opSel.find(".option-text").addClass("center");
    }
    $opSelected = $opSel.find(".selected-option")
    $opSelected.text($opSelected.attr("data-text"));
    _$select = $parent_Select.find("select");
    _$select.attr("data-changed", "false");
}

function getComboValue($parent_Select) {
    _$select = $parent_Select.find("select");
    if (_$select.attr("data-changed") == "false") {
        return null;
    }
    return _$select.val();
}

function loadComboSelect() {
    comboConfig = typeof comboConfig === "undefined" ? {} : comboConfig;
    comboConfig["onSelectOption"] = typeof comboConfig.onSelectOption === "undefined" ? function() {} : comboConfig.onSelectOption;
    $(document).click(function(event) {
        if (!$(event.target).hasClass("sl")) {
            hideOptions($(".option-select[data-selec-open='true']"));
        }
    });


    $(".form-group-select").each(function() {
        $parentSelect = $(this);
        _ul = document.createElement("ul");
        _ul.style.display = "none";
        $parentSelect.find("select > option").each(function() {
            _li = document.createElement("li");
            _att = document.createAttribute("data-i");
            _att.value = this.value;
            _li.setAttributeNode(_att);
            _t = document.createTextNode(this.text);
            _li.appendChild(_t);
            _ul.appendChild(_li);
        });
        $opSel = $parentSelect.find(".option-select");
        $selOption = $parentSelect.find(".selected-option");
        if ($opSel.attr("data-type") == "animated") {
            $opSel.find(".option-text").addClass("center");
            $parentSelect.find(".selected-option").text("");
        }
        $selOption.attr("data-text", $selOption.text());
        $opSel.append(_ul);
        $parentSelect.find(".option-select .select-title").click(function() {
            $optionSelect = $(this).closest(".option-select");
            if ($optionSelect.attr("data-selec-open") == "false") {
                showOptions($optionSelect);
            } else {
                hideOptions($optionSelect);
            }
        });
    });
    $(".option-select ul li").click(function() {
        $parent_Select = $(this).closest(".form-group-select");
        _$select = $parent_Select.find("select");
        _$select.attr("data-changed", "true");
        _$select.val($(this).attr("data-i"));
        $parent_Select.find(".option-text.center").removeClass("center");
        $parent_Select.find(".selected-option").text($(this).text());;
        comboConfig.onSelectOption($parent_Select);

        if (getComboValue($("#filtro-mes")) || getComboValue($("#filtro-estatus"))) {
            $("a[title='buscar']").removeClass("btn__disabled");
            $("a[title='buscar']").addClass("btn__medium-blue");
        }
    });
}

