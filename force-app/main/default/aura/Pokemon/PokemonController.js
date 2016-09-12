({
    doInit : function(component, event, helper) {
		var action = component.get("c.findById");
        action.setParams({
            "propertyId": component.get("v.recordId")
        });
        // Register the callback function
        action.setCallback(this, function() {
            var property = action.getReturnValue();
            component.set("v.pictureurl", property.Picture__c);
        });
        // Invoke the service
        $A.enqueueAction(action);
    }
})