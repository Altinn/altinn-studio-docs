---
title: Notifications
description: Altinn Notifications offers capabilities for one way communication with citizens and businesses operating in Norway.
toc: false
weight: 20
aliases:
  - /altinn-notifications/
cascade:
  params:
    product: product_notifications
---

 <div class="row adocs-featuredBlocks">
    <div class="col-12 col-lg-6 mb-5">
        <div style="text-align: center;">
            <h2 class="a-h3">Find out more</h2>
            <p class="a-js-truncate-2">Read more about Altinn Notifications</p>
            <div class="a-illustration-icon">
                <img src="./Notifications-1.svg">
                <div class="a-illustration-overlay">
                    <span class="sr-only">Find out more</span>
                </div>
            </div>
        </div>
        <div class="a-list-container mb-2 mx-auto mx-lg-6">
            <ul class="a-list a-list-noIcon">
             <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="about" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                About Notifications
                            </div>
                        </div>
                    </a>
                </li>
                <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="reference/api" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                API reference
                            </div>
                        </div>
                    </a>
                </li> 
            </ul>
        </div>
    </div>
    <div class="col-12 col-lg-6 mb-5">
        <div style="text-align: center;">
            <h2 class="a-h3">Get started</h2>
            <p class="a-js-truncate-2">Send your first notification</p>
            <div class="a-illustration-icon">
                <img src="./Notifications-2.svg">
                <div class="a-illustration-overlay">
                    <span class="sr-only">Send your first notification</span>
                </div>
            </div>
        </div>
        <div class="a-list-container mb-2 mx-auto mx-lg-6">
    <ul class="a-list a-list-noIcon">
             <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="getting-started/altinn-app" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                Altinn App Integration
                            </div>
                        </div>
                    </a>
                </li>
                <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="getting-started/altinn-service" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                Altinn Service Integration
                            </div>
                        </div>
                    </a>
                </li>                
                <li class="a-dotted a-clickable a-list-hasRowLink">
                    <a href="getting-started/service-owner-system" class="a-list-rowLink">
                        <div class="row">
                            <div class="col">
                                Service Owner System Integration
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

## Testing
For getting an actual SMS to your handset in the TT02 test environment, please send a request to [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no) to add your number to the allow-list. Unlisted numbers are treated as real, but sent to a simulator instead of a real network provider (i.e if passing validation, are accepted by the API and appears as successfully delivered to the handset).

Test-emails are sent as normal. Please note that in some cases the recipient identifies this as spam, so please check the appropriate folders if the order has a success-state.

**NB1**: If you are configuring a Tenor test user for SMS (in their capacity as an individual), please note that there is a separate SMS allow-listing process required (to get the KRR auth-code confirming the update). See [KRR testbrukere | KRR](https://docs.digdir.no/docs/Kontaktregisteret/krr_testbrukere#bruk-av-reelle-mobilnummer)

**NB2**: There is a delay of up to 10 minutes for any changes to contact-information for a person or organization to take effect in Notifications.

## SMS to international recipients
Due to regulatory conditions, SMS sent to Finnish (+358), Thai (+66) and Spanish (+34) mobile numbers may fail. We are working on handling this better. In the meantime, service owners with target audiences resident in these countries should prefer the email channel and pay extra attention to users expecting SMS on their foreign subscriptions.

The issue only affects subscriptions from local operators in these countries. Norwegian numbers roaming on those operators (e.g. while on holiday or staying in the countries mentioned) should not be affected.

SMS status will, as today, be "SMS_Delivered" once the message is confirmed as delivered, and "SMS_Failed*" (various variants) when the SMS cannot be confirmed as delivered, so that this can be picked up by existing processes on the service owner side. See also
[status values for orders and notifications]({{< relref "/notifications/reference/notification-status#smsnotificationresulttype-sms-result" >}}).

__Finland__: A SenderID that is not registered is changed to "tuntematon" (unknown). Delivery otherwise should proceed as normal. --> We are working on registering all known and legitimate IDs*

__Spain__: A SenderID that is not registered through a local lawyer can/will fail (currently planned to take effect from 7 June 2026). --> Our supplier's recommendation is *not* to start the process with a keyword, but to use a numeric sender. We are working on a practical solution to this.

__Thailand__: A SenderID that is not registered and/or the use of URL(s) in message content can/will fail. --> We are working on registering all known and legitimate IDs*

*: As far as is feasible – the process may require further legal follow-up regarding ownership/responsibility for keywords and message content.


## Source code
The code is on [Github](https://github.com/Altinn/altinn-notifications)
