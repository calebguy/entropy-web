module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a DSL component",
    prompts: [{ type: "input", name: "name", message: "Component name" }],
    actions: [
      {
        type: "add",
        path: "packages/ui/{{name}}/{{name}}.tsx",
        templateFile: "plop/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "apps/docs/components/demos/{{name}}.demo.tsx",
        templateFile: "plop/Demo.tsx.hbs",
      },
      {
        type: "append",
        path: "packages/ui/index.tsx",
        template: "export * from './{{name}}/{{name}}'",
      },
    ],
  });
};
