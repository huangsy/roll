;(function ($) {

    var numCls = 'roll-num';
    var rollCls = 'roll';
    var numGroupCls = 'roll-num-group'
    var tmpl = '<ul class="' + rollCls + '" style="left:0px; top:6px"><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li></ul>';

    // 给每个数字加个wrapper
    // 1.23转换成<span>1</span>.<span>2</span><span>3</span>
    function _parse(num) {
        return $.map((num + "").match(/./g), function(item) {
          if (/\d/.test(item)) {
            return '<span class="' + numCls + '">' + item + '</span>';
          } else {
            return item;
          }
        }).join('');      
    }

    // 初始化roll
    function _init(num) {
        var elem = $(this);
        num += '';
        var numbers = (num).match(/\d/g); // '1.23' -> [1, 2, 3]
        var numEls = elem.find('.' + numCls);

        if (elem.find('.' + rollCls).length == 0) {
            $.each(numbers, function (k, v) {
                var item = numEls.eq(k);
                var rollEl = $(tmpl);
                elem.append(rollEl);
                rollEl.css({
                    left: item.offset().left - elem.offset().left,
                    top: v * -item.height()
                });
            });
        }
    }

    // 更新数字
    function _update() {
        var elem = $(this);
        var num = elem.find('.' + numGroupCls).html();
        elem.find('.' + numGroupCls).html(_parse(num));
        var numbers = (num).match(/\d/g);
        var len = numbers.length;
        var rollEl = elem.find('.' + rollCls);
        var delta = len - rollEl.length;
        if (delta > 0) { // 位数变动以后，重新初始化roll
            rollEl.remove();
            $.proxy(_init, this)(num);
            rollEl = elem.find('.' + rollCls);
        }
        $.each(numbers, function (k, v) {
            var item = rollEl.eq(k);
            item.css('top', v * -item.height() / 10);
        });
    }

    var Roll = function () {};

    Roll.prototype = {
        roll: function (num) {
            var self = this;
            this.each(function () {
                if ($(this).find('.' + numGroupCls).length === 0) {
                    $(this).html($('<span>', {
                        class: numGroupCls
                    }));
                }
                $(this).find('.' + numGroupCls).html(num);
                $.proxy(_update, this)();
            });
            return this;
        }
    };

    $.extend($.fn, Roll.prototype);
})(Zepto);
