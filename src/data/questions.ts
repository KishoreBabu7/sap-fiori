export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswers: string[];
  note?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Which activities does the OData Model Editor support?",
    options: [
      "Edit ODataModels",
      "Deploy ODataModels",
      "Create ODataModels",
      "Test ODataModels"
    ],
    correctAnswers: ["Edit ODataModels", "Test ODataModels"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 2,
    question: "What are the lifecycle events of an SAPUI5 view controller?",
    options: [
      "onRendering",
      "onExit",
      "onAfterRendering",
      "onbeforeEntry"
    ],
    correctAnswers: ["onExit", "onAfterRendering"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 3,
    question: "Which features of the SAP Business Application Studio help you extend a standard SAP Fiori app?",
    options: [
      "A wizard to generate the files for each extension possibility",
      "An editor to modify the data model in the extended project",
      "The Extensibility Pane to choose extension points",
      "The Descriptor Editor to choose elements for extension"
    ],
    correctAnswers: ["A wizard to generate the files for each extension possibility", "The Extensibility Pane to choose extension points"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 4,
    question: "What are some examples of extension points?",
    options: [
      "Table building block",
      "Custom column",
      "Custom action",
      "Custom section",
      "Field building block"
    ],
    correctAnswers: ["Custom column", "Custom action", "Custom section"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 5,
    question: "Which of the following are features of the SAPUI5 SDK?",
    options: [
      "Interface for Web Dynpro",
      "Full translation support",
      "Responsiveness across browsers on non-mobile devices only",
      "Feature-rich UI controls for handling complex UI patterns"
    ],
    correctAnswers: ["Full translation support", "Feature-rich UI controls for handling complex UI patterns"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 6,
    question: "What does the following ABAP CDS annotation achieve in an SAP Fiori elements app?\n@UI.lineItem: [{position: 10}] ProductName;\n@UI.lineItem: [{position: 30}] Price;\n@UI.lineItem: [{position: 20}] Status;",
    options: [
      "3 columns: ProductName as the first column, Status as the second column, Price as the third column",
      "3 fields in a form: ProductName as the first field, Price as the second field, Status as the third field",
      "3 columns: ProductName as the first column, Price as the second column, Status as the third column",
      "3 fields in a form: ProductName as the first field, Status as the second field, Price as the third field"
    ],
    correctAnswers: ["3 columns: ProductName as the first column, Price as the second column, Status as the third column"]
  },
  {
    id: 7,
    question: "To which of the following does an SAP Fiori tile point to directly?",
    options: [
      "An SAP Fiori app",
      "A target mapping with a semantic object and an action",
      "An action",
      "A semantic object"
    ],
    correctAnswers: ["A target mapping with a semantic object and an action"]
  },
  {
    id: 8,
    question: "You need to bind data from a model to an SAPUI5 view control. Which of the following modes are valid?",
    options: [
      "One-time binding",
      "Three-way binding",
      "Resource-model binding",
      "Two-way binding",
      "One-way binding"
    ],
    correctAnswers: ["One-time binding", "Two-way binding", "One-way binding"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 9,
    question: "You need the backend server to sort and filter the data used in your customer's app. Which SAPUI5-supported data model must you use?",
    options: [
      "ODataModel",
      "ResourceModel",
      "JSONModel",
      "XMLModel"
    ],
    correctAnswers: ["ODataModel"]
  },
  {
    id: 10,
    question: "You need to securely connect the SAP Web IDE to an on-premise system. How does the SAP Cloud Connector help do this?",
    options: [
      "It creates connectivity by a reverse-invoke process on the on-premise system.",
      "It supports custom destination API configuration and certificate inspection.",
      "It secures an SSL tunnel between the SAP Cloud and the on-premise system.",
      "It initiates a cloud-based reverse-invoke process."
    ],
    correctAnswers: ["It creates connectivity by a reverse-invoke process on the on-premise system.", "It secures an SSL tunnel between the SAP Cloud and the on-premise system."],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 11,
    question: "To visualize metrics using cards, which SAP Fiori elements template does SAP recommend to use?",
    options: [
      "List Report Page",
      "Overview Page",
      "Custom Page",
      "Analytical List Page"
    ],
    correctAnswers: ["Overview Page"]
  },
  {
    id: 12,
    question: "You develop an SAPUI5 app that updates data for sales order and sales order items on the backend system. What do you create to implement a deep insert?",
    options: [
      "An object structure that defines the hierarchy.",
      "An individual structures for both Sales Order and Sales Order Items, and then batch them.",
      "A flat structure with Sales Order and Sales Order Items, and then add an expand command.",
      "A nested structure for Sales Order and Sales Order Items."
    ],
    correctAnswers: ["An object structure that defines the hierarchy.", "A nested structure for Sales Order and Sales Order Items."],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 13,
    question: "You perform a QUnit test with the following syntactical options. Which call returns true when you execute it?",
    options: [
      "assert.strictEqual(0,\"0\",\"true\");",
      "assert.strictEqual(0,\" \",\"true\");",
      "assert.strictEqual(0,null,\"true\");",
      "assert.strictEqual(0,-0,\"true\");"
    ],
    correctAnswers: ["assert.strictEqual(0,-0,\"true\");"]
  },
  {
    id: 14,
    question: "What are some advantages of the Model View Controller (MVC) design pattern used in SAPUI5?",
    options: [
      "Allows to define several views of the same data.",
      "MVC artifacts can be transported and debugged separately.",
      "It supports quick coding.",
      "Allows changing the view without modifying the underlying business logic."
    ],
    correctAnswers: ["MVC artifacts can be transported and debugged separately.", "It supports quick coding."],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 15,
    question: "Which SAP Fiori application can you launch using the search function instead of a tile?",
    options: [
      "Factsheet",
      "Analytical",
      "Legacy",
      "Transactional"
    ],
    correctAnswers: ["Factsheet"]
  },
  {
    id: 16,
    question: "Which file is required for configuring an SAP Fiori elements application?",
    options: [
      "config.xml",
      "package.json",
      "manifest.json",
      "settings.json"
    ],
    correctAnswers: ["manifest.json"]
  },
  {
    id: 17,
    question: "You want to add a column to the list report table that will display the status (OK: green, Warning: Yellow, Error: Red). The field called UpdatedStatus in the Sales entity has values '1' for errors, '2' for warnings, '3' for OK. Which ABAP CDS annotation must you add?",
    options: [
      "@UI.selectionField: [{position: 30}] UpdatedStatus;",
      "@UI.lineItem: [{position: 30, color: 'UpdatedStatus'}] Status;",
      "@UI.lineItem: [{position: 30, criticality: 'UpdatedStatus'}] Status;",
      "@UI.lineItem: [{position: 30}] @UI.selectionField: [{position: 30}] Status; UpdatedStatus;"
    ],
    correctAnswers: ["@UI.lineItem: [{position: 30, criticality: 'UpdatedStatus'}] Status;"]
  },
  {
    id: 18,
    question: "In a standard SAPUI5 project, which file is the Application Descriptor that contains the metadata description of the application?",
    options: [
      "Neo-app.json",
      "Manifest.json",
      "Component.js",
      "Index.html"
    ],
    correctAnswers: ["Manifest.json"]
  },
  {
    id: 19,
    question: "Your customer extends an SAP Fiori app with View Replacement. Which activities do you perform?",
    options: [
      "Create an SAPUI5 view that replaces the complete view.",
      "Verify that adding custom content in the Extension Points is NOT sufficient",
      "Create an SAPUI5 control that replaces the original control",
      "Identify a specific SAPUI5 control to be replaced."
    ],
    correctAnswers: ["Create an SAPUI5 view that replaces the complete view.", "Verify that adding custom content in the Extension Points is NOT sufficient"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 20,
    question: "You are modeling a new role for your SAP Fiori Launchpad users. Which of the following steps is an optional configuration step?",
    options: [
      "Assign Catalog to Role",
      "Create Group and Assign Tile",
      "Create Tiles and Target Mappings",
      "Create Catalog"
    ],
    correctAnswers: ["Create Group and Assign Tile"]
  },
  {
    id: 21,
    question: "The following ABAP CDS annotation is used in an SAP Fiori elements app. What will be displayed in the upper left part of the object page?\n@UI.headerInfo: {typeNamePlural: 'Sales Orders', typeName: 'Sales Order', title: {type: #STANDARD, value: 'Sales order Number'}, description: {type: #STANDARD, value: 'Sales Order Owner'}}",
    options: [
      "'Sales Order'",
      "Sales Order Number value",
      "Sales Order Owner",
      "'Sales Orders'"
    ],
    correctAnswers: ["'Sales Order'", "Sales Order Owner"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 22,
    question: "Which of the following activities allows you to send commits from your local branch in your Git repository to the remote repository?",
    options: [
      "Push",
      "Save",
      "Commit",
      "Clone"
    ],
    correctAnswers: ["Commit"]
  },
  {
    id: 23,
    question: "Which of the following tile types can use an OData service to set the title properties?",
    options: [
      "Static",
      "Semi-dynamic",
      "Dynamic"
    ],
    correctAnswers: ["Dynamic"]
  },
  {
    id: 24,
    question: "Which of the following UI elements can be part of a standard Analytical list page Application?",
    options: [
      "Visual filter",
      "Form section",
      "Table",
      "Visual table",
      "Interactive chart"
    ],
    correctAnswers: ["Visual filter", "Table", "Interactive chart"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 25,
    question: "You created a new catalog that contains some apps. You want to assign these apps to an existing role to provide authorization for the business users. How can you do this using the PFCG transaction?",
    options: [
      "By adding the semantic object to the catalog and group",
      "By adding the catalog to the menu tab of the role",
      "By assigning the authorization profile for the catalog in the authorization tab",
      "By adding the tile and target mapping to the group"
    ],
    correctAnswers: ["By adding the tile and target mapping to the group"]
  },
  {
    id: 26,
    question: "You need to configure an SAP Destination service to enable SAP Business Application Studio to extend an existing SAP Fiori app. Which configuration setting for the WebIDE Usage property is required?",
    options: [
      "extend_abap",
      "odata_abap",
      "ui5_execute_abap",
      "dev_abap"
    ],
    correctAnswers: ["odata_abap"]
  },
  {
    id: 27,
    question: "Your customer requires an app to display flight information on a mobile device. Which options can you use to display the same data in a readable format on a mobile device?",
    options: [
      "column:<column demandpopin='true' maxscreenwidth='mobile'></column>",
      "column:<column demandpopin='true' maxscreenwidth='mobile' popindisplay='Inline'></column>",
      "column:<column demandpopin='true' minscreenwidth='tablet'></column>",
      "column:<column demandpopin='true' minscreenwidth='tablet' popindisplay='Inline'></column>"
    ],
    correctAnswers: ["column:<column demandpopin='true' minscreenwidth='tablet'></column>", "column:<column demandpopin='true' minscreenwidth='tablet' popindisplay='Inline'></column>"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 28,
    question: "Which of the following content types can be displayed within a table cell in SAP Fiori elements applications?",
    options: [
      "text",
      "chart",
      "image",
      "table",
      "micro chart"
    ],
    correctAnswers: ["text", "image", "micro chart"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 29,
    question: "Which model supports deep inserts?",
    options: [
      "XML model",
      "OData model",
      "JSON model",
      "Resource model"
    ],
    correctAnswers: ["OData model"]
  },
  {
    id: 30,
    question: "What can you use to add a filter field to a list report in an SAP Fiori elements application?",
    options: [
      "A UI.LineItem annotation",
      "A UI.SelectionField annotation",
      "A setting in the manifest.json file",
      "The Page Map"
    ],
    correctAnswers: ["A UI.SelectionField annotation", "A setting in the manifest.json file"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 31,
    question: "What are some benefits of using OData V4 compared to OData V2?",
    options: [
      "Flexible programming model",
      "Better UX consistency",
      "Advanced analytical capabilities",
      "Improved data types",
      "Better data compression"
    ],
    correctAnswers: ["Flexible programming model", "Advanced analytical capabilities", "Improved data types"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 32,
    question: "What are some benefits of using SAP Fiori elements?",
    options: [
      "Accessibility support and multi-device compatibility",
      "Reduced development and maintenance costs",
      "Accelerated development of JavaScript UI code",
      "Custom floorplans for unique scenarios",
      "Compliance with SAP Fiori design specifications"
    ],
    correctAnswers: ["Accessibility support and multi-device compatibility", "Reduced development and maintenance costs", "Compliance with SAP Fiori design specifications"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 33,
    question: "Which of the following are generic actions provided by SAP Fiori elements?",
    options: [
      "Trigger external navigation.",
      "Delete an item.",
      "Create an item.",
      "Approve an item."
    ],
    correctAnswers: ["Delete an item.", "Create an item."],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 34,
    question: "You finalized your SAPUI5 app in the SAP Business Application Studio. To which of the following platforms can you deploy this app?",
    options: [
      "SAPUI5 Java repository",
      "SAPUI5 ABAP repository",
      "SAP Fiori launchpad",
      "SAP BTP"
    ],
    correctAnswers: ["SAPUI5 ABAP repository", "SAP BTP"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 35,
    question: "What can you do using the SAP Fiori Tools Extension Pack?",
    options: [
      "Implement SAP Business Technology Platform integration",
      "Build SAP Fiori applications",
      "Develop the SAP Fiori elements framework"
    ],
    correctAnswers: ["Build SAP Fiori applications"]
  },
  {
    id: 36,
    question: "While testing an SAP Fiori app you discover that the navigation on the page does not work correctly. Which of the following agile pyramid options do you use?",
    options: [
      "Sinon",
      "QUnit",
      "OPA",
      "Mock server"
    ],
    correctAnswers: ["OPA"]
  },
  {
    id: 37,
    question: "Which control can you use to create responsive table-free layouts?",
    options: [
      "sap.ui.layout.ResponsiveFlowLayout",
      "sap.ui.layout.Grid",
      "sap.ui.layout.VerticalLayout",
      "sap.ui.layout.HorizontalLayout"
    ],
    correctAnswers: ["sap.ui.layout.Grid"]
  },
  {
    id: 38,
    question: "In the data in the screenshot, you want to display the List of Companies in the Americas region. Which binding option do you use for the values X, Y, and Z in the view?",
    options: [
      "X: /regions/0/companies Y: companies/0/name Z: companies/0/city",
      "X: /regions/companies Y: companies/name Z: companies/city",
      "X: /regions/0/companies Y: name Z: city",
      "X: /regions/companies Y: name Z: city"
    ],
    correctAnswers: ["X: /regions/0/companies Y: name Z: city"]
  },
  {
    id: 39,
    question: "A business user is unable to find an application on the SAP Fiori Launchpad or on the App Finder. Which of the following options could explain why the tile is unavailable?",
    options: [
      "The user does not have the proper PFCG role assigned to see the application or tile",
      "The catalogs assigned to the user do not contain the relevant application or tile",
      "The OData service authorization is missing.",
      "The target mapping for the tile is missing in the catalog.",
      "The end user is missing the required group containing the tile."
    ],
    correctAnswers: ["The user does not have the proper PFCG role assigned to see the application or tile", "The catalogs assigned to the user do not contain the relevant application or tile", "The end user is missing the required group containing the tile."],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 40,
    question: "Which of the following are building blocks provided by SAP Fiori elements?",
    options: [
      "Filter Field",
      "Custom Page",
      "Routing",
      "Table",
      "Field"
    ],
    correctAnswers: ["Filter Field", "Table", "Field"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 41,
    question: "You want to create an SAP Fiori application containing charts and visual filters. Which SAP Fiori template would you use?",
    options: [
      "Custom Page",
      "Worklist Page",
      "Analytical List Page"
    ],
    correctAnswers: ["Analytical List Page"]
  },
  {
    id: 42,
    question: "What is added by the following ABAP CDS annotation to an SAP Fiori elements app?\n@UI.facet: [{label: 'Personal data', type: #COLLECTION, id: 'persData', position: 10}, {label: 'address', purpose: #STANDARD, position: 10, type: #FIELDGROUP_REFERENCE, parentId: 'persData', targetQualifier: 'address'}]",
    options: [
      "Two sections in the object page body: one displaying personal data and one displaying the address details",
      "A section containing a subsection which displays the address details",
      "Two sections in the object page header displaying personal data and person's address details"
    ],
    correctAnswers: ["A section containing a subsection which displays the address details"]
  },
  {
    id: 43,
    question: "Which of the following pattern sequences are the QUnit tests based on?",
    options: [
      "Assert, Act, and Arrange",
      "Given, When, and Then",
      "Arrange, Act, and Assert",
      "Given, Then, and When"
    ],
    correctAnswers: ["Arrange, Act, and Assert"]
  },
  {
    id: 44,
    question: "What are some SAP recommended ways of adding custom code to an SAP Fiori elements application?",
    options: [
      "Use controller extensions.",
      "Use private methods of SAP Fiori elements.",
      "Create new templates.",
      "Use building blocks.",
      "Create apps using the custom page template in the application"
    ],
    correctAnswers: ["Use controller extensions.", "Use building blocks.", "Create apps using the custom page template in the application"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 45,
    question: "How can you configure the Flexible Column Layout in an SAP Fiori elements application?",
    options: [
      "By adding a setting to the manifest.json file",
      "By implementing a flexible custom extension",
      "By adding a setting to the package.json file",
      "By using the Page Map"
    ],
    correctAnswers: ["By adding a setting to the manifest.json file", "By using the Page Map"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 46,
    question: "The following ABAP CDS annotation is used in an SAP Fiori elements app. What is the title of the list report table?\n@UI.headerInfo: {typeNamePlural: 'Sales Orders', typeName: 'Sales Order', title: {type: #STANDARD, value: 'Sales Order Number'}, description: {type: #STANDARD, value: 'Sales Order Owner'}}",
    options: [
      "Sales Order Owners",
      "Sales Orders",
      "Sales Order Numbers"
    ],
    correctAnswers: ["Sales Orders"]
  },
  {
    id: 47,
    question: "In the screenshot, which element of the Arrange-Act-Assert pattern corresponds to the Act in a QUnit test?",
    options: [
      "this.calculator.press(\"1\");",
      "QUnit.test",
      "QUnit.module",
      "teardown: function() {}"
    ],
    correctAnswers: ["this.calculator.press(\"1\");"]
  },
  {
    id: 48,
    question: "You develop an SAPUI5 app and implement a FacetFilter. What events are triggered when the user interacts with the FacetFilter content?",
    options: [
      "listFilter",
      "oninit",
      "reset",
      "confirm"
    ],
    correctAnswers: ["reset", "confirm"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 49,
    question: "How can you extend an SAP Fiori app?",
    options: [
      "Modify the data model to merge data at runtime.",
      "Create an adaptation project",
      "Modify the runtime libraries that are to be loaded.",
      "Modify the properties of the view control",
      "Add custom view content in a predefined extension point"
    ],
    correctAnswers: ["Create an adaptation project", "Modify the properties of the view control", "Add custom view content in a predefined extension point"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 50,
    question: "Which activities does the OData Model Editor support?",
    options: [
      "Edit ODataModels",
      "Deploy ODataModels",
      "Create ODataModels",
      "Test ODataModels"
    ],
    correctAnswers: ["Edit ODataModels", "Create ODataModels"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 51,
    question: "You develop an SAPUI5 app that can be extended. To allow your customer to customize notifications you set up a hook method. What activities are required to set up a hook method?",
    options: [
      "Modify the bootstrap option to allow multi-layer extensions of the custom code",
      "Define a new function name ensuring it is reserved for the extension",
      "Identify a strategic location in the controller for the customized code",
      "Add a code snippet to check if the method exists and execute it",
      "Create a .js file in the Util folder to allow the customer to add customized code"
    ],
    correctAnswers: ["Define a new function name ensuring it is reserved for the extension", "Identify a strategic location in the controller for the customized code", "Add a code snippet to check if the method exists and execute it"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 52,
    question: "In a SAP Fiori hub deployment, where is the SAPUI5 application code stored for a transactional app?",
    options: [
      "SAP Front-End Server (FES)",
      "SAP Web Dispatcher",
      "SAP Back-End Server (BES)",
      "SAP HANA XS Engine"
    ],
    correctAnswers: ["SAP Front-End Server (FES)"]
  },
  {
    id: 53,
    question: "Your customer asks you to add text for a new language to an app. Which file do you send to the translator?",
    options: [
      "Master.view.xml",
      "i18n.properties",
      "Component.js",
      "Manifest.json"
    ],
    correctAnswers: ["i18n.properties"]
  },
  {
    id: 54,
    question: "Your customer wants to enable the SAP Fiori app to be accessed in multiple languages. Which of the following activities do you perform?",
    options: [
      "Create a resource file containing key/value pairs",
      "Create a resource file with a .props extension.",
      "Create a resource file for each language.",
      "Encode the special characters in HTML in the resources file",
      "Create a view file and a controller file for each language"
    ],
    correctAnswers: ["Create a resource file containing key/value pairs", "Create a resource file for each language.", "Encode the special characters in HTML in the resources file"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 55,
    question: "What are some characteristics of fragments?",
    options: [
      "Fragments have their own controller.",
      "Fragments can be a stand-alone view.",
      "Fragments are light-weight UI parts that can be reused",
      "Fragments are found by SAPUI5 Runtime using the module loading mechanism"
    ],
    correctAnswers: ["Fragments are light-weight UI parts that can be reused", "Fragments are found by SAPUI5 Runtime using the module loading mechanism"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 56,
    question: "Your customer asks you to demonstrate their app with localization changes. Which activity do you perform?",
    options: [
      "Configure the run configuration file in the app.",
      "Show the i18n.properties file translations.",
      "Use the preview frame in the run configuration.",
      "Configure the supportedLanguages settings in the Project.json file"
    ],
    correctAnswers: ["Show the i18n.properties file translations."]
  },
  {
    id: 57,
    question: "Which HTTP request method can you use to create an OData resource?",
    options: [
      "POST",
      "PUT",
      "UPDATE",
      "CHANGE"
    ],
    correctAnswers: ["POST"]
  },
  {
    id: 58,
    question: "You are extending an SAP Fiori app. Which of the extension properties are defined in the manifest.json?",
    options: [
      "sap.ui.modelModifications",
      "sap.ui.i18nModifications",
      "sap.ui.controllerExtensions",
      "sap.ui.viewModifications"
    ],
    correctAnswers: ["sap.ui.controllerExtensions", "sap.ui.viewModifications"],
    note: "There are 2 correct answers to this question."
  },
  {
    id: 59,
    question: "Which of the following determines how data is displayed in SAP Fiori element applications?",
    options: [
      "Application logic",
      "Templates",
      "Database structure",
      "User permissions"
    ],
    correctAnswers: ["Templates"]
  },
  {
    id: 60,
    question: "Which methods can you use to bind data to the controls in SAPUI5?",
    options: [
      "Structure",
      "Property",
      "Combination",
      "Element",
      "Aggregation"
    ],
    correctAnswers: ["Property", "Element", "Aggregation"],
    note: "There are 3 correct answers to this question."
  },
  {
    id: 61,
    question: "What can you do to create a worklist SAP Fiori elements application?",
    options: [
      "Add the UI.hideFilterBar annotation to the local annotation file.",
      "Use the Page Map to hide the filterbar of a list report application.",
      "Add a setting to the manifest.json file of your list report.",
      "Add the UI.hideFilterBar annotation in the backend.",
      "Use the Application Generator with a suitable template"
    ],
    correctAnswers: ["Add a setting to the manifest.json file of your list report.", "Use the Page Map to hide the filterbar of a list report application.", "Use the Application Generator with a suitable template"],
    note: "There are 3 correct answers to this question."
  }
];
