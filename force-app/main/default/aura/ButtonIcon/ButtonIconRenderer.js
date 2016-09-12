({ 
    afterRender: function(component, helper) { 
        var svg = component.find("svg_content");
        var value = svg.getElement().innerText; 
        svg.getElement().innerHTML = value;
	}
})