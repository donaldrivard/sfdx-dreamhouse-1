({
	doInit : function(component, event, helper) {
		var action = component.get("c.findById");
        action.setParams({
            "propertyId": component.get("v.recordId")
        });
        // Register the callback function
        action.setCallback(this, function() {
            var property = action.getReturnValue();
            component.set("v.principal", property.Price__c);
	        helper.calculateMonthlyPayment(component);
        });
        // Invoke the service
        $A.enqueueAction(action);
    },

    calculateMonthlyPayment : function(component, event, helper) {
        helper.calculateMonthlyPayment(component);
	}
})