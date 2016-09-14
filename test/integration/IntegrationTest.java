package test.integration;

import org.junit.*;
import org.openqa.selenium.*;

/**
 * Base test for ALMSourceDrivenDev/Example-Dev-Workspace UI tests.
 */
public class IntegrationTest extends BaseSalesforceTest {
    @Test
    public void testIntegration() {
        final String pageSrc = this.login("/one/one.app");

        // TODO Check an actual element of the dreamhouse app. We need to fist
        // click to go to the dreamhouse app, then click property explorer, then
        // we can check an interesting div, like //.cPropertyExplorer h1"))
        // OR maybe after data is loaded we can go directly to #/sObject/Property__c/home

        WebElement e = this.fluentWait(new By.ByCssSelector(".oneContent h2"));
        Assert.assertTrue("One.app was not loaded", e.isDisplayed());
    }
}
