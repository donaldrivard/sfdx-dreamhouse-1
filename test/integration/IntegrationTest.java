package test.integration;

import java.util.List;
import org.junit.*;
import org.openqa.selenium.*;

/**
 * Base test for ALMSourceDrivenDev/Example-Dev-Workspace UI tests.
 */
public class IntegrationTest extends BaseSalesforceTest {
    @Test
    public void testIntegration() {
        
//        final String pageSrc = this.login("/one/one.app");
//        WebElement e = this.fluentWait(new By.ByCssSelector(".oneContent h2"));
//        Assert.assertTrue("One.app was not loaded", e.isDisplayed());		
//
         final String pageSrc = this.login("/one/one.app#/sObject/Property__c/home");
         // Salesforce retUrl will strip the hash. Selenium driver.get() will hang on a hash.
         // SO set the hash manually.
         ((JavascriptExecutor) driver).executeScript("window.location.hash='#/sObject/Property__c/home'");
         this.fluentWait(By.className("salesforceIdentityAppLauncherHeader")).isDisplayed();

         this.fluentWait(By.linkText("Properties")).click();
         this.fluentWait(By.linkText("Contemporary Luxury")).click();

         WebElement e = this.fluentWait(By.xpath("//span[contains(text(), 'IQ Picture Uploader')]"));
         Assert.assertTrue("IQ Compontent was not loaded", e.isDisplayed());
    }
}
