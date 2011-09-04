/*
 * Copyright (c) 2011 Arron Bailiss <arron@arronbailiss.com>
 * Based on original code from Steve Chipman (slayeroffice.com)
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */


(function($) {
	$.fn.customAlert = function(options) {
		var settings = {
			'alertTitle' : 'Notice!',
			'alertOk'	 : 'OK',
			'draggable'	 : false
		};
		
		if (options) $.extend(settings, options);
		
		if(document.getElementById) {
			window.defaultAlert = window.alert; // Call defaultAlert() to use the standard alert() behavior
			window.alert = function(msgTxt) {
				if ($('#modalDiv').length > 0) return; // Only ever show one alert
				
				// The modal div to block out the rest of the document whilst the alert is shown
				var modalDiv = $('<div></div>').attr('id', 'modalDiv')
					.height($(document).height()); // Make overlay cover the whole window
				
				// The alert container
				var alertDiv = $('<div></div>').attr('id', 'alertDiv');
				
				// The alert title
				var titleH1 = $('<h1></h1>').addClass('titleH1')
					.text(settings.alertTitle);
				
				// The alert text to display
				var msgP = $('<p></p>').text(msgTxt);
				
				// OK button - will remove/close the alert on click
				var okBtn = $('<a></a>').addClass('okBtn')
					.text(settings.alertOk)
					.attr('href', '#');
				
				// Append elements to document body
				alertDiv.append(titleH1)
					.append(msgP)
					.append(okBtn);
				$('body').append(modalDiv)
					.append(alertDiv);
				
				// Center alert on page
				$('#alertDiv').css({
					top: ($(window).height()/2) - ($('#alertDiv').height()/2)+'px',
					left: ($(window).width()/2) - ($('#alertDiv').width()/2)+'px'
				});
				
				// Make draggable
				if (settings.draggable && $('#alertDiv').draggable) {
					$('#alertDiv').draggable({
						handle: 'h1',
						opacity: 0.4
					});
					$('#alertDiv h1').css('cursor', 'move');
				}
				
				// Bind OK button to remove/close alert
				$('#alertDiv .okBtn').bind('click', function(e) {
					$('#alertDiv, #modalDiv').remove();
					e.preventDefault();
				});
				
				$(window).keydown(function(e) {
					if (e.keyCode == '13') {
						$('#alertDiv .okBtn').click();
						$(this).unbind('keydown');
					}
				});
			};
		}
	};
})(jQuery);