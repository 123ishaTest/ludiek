<script lang="ts">
  import { z, type ZodType } from 'zod';
  import GenericForm from './GenericForm.svelte';
  import _ from 'lodash';

  interface Props {
    schema: ZodType;
  }

  let { schema }: Props = $props();

  let json = $derived(z.toJSONSchema(schema, { io: 'input' }));

  function handleSubmit(e) {
    const object = {};

    const formData = new FormData(e.target);

    formData.entries().forEach(([key, value]) => {
      let asInt = parseInt(value);
      if (asInt) {
        _.set(object, key, asInt);
      } else {
        _.set(object, key, value);
      }
    });

    console.log('object', object);

    const parsed = schema.parse(object);
    console.log('parsed', parsed);
  }
</script>


<div class="card bg-base-300 w-96 shadow-sm">
  <div class="card-body">
    <h2 class="card-title">{json.title}</h2>
    <form class="flex flex-col space-y-2" onsubmit={handleSubmit}>
      <GenericForm {json} />
      <button class="btn btn-primary mt-2" type="submit">Save</button>
    </form>
  </div>
</div>

<pre>
{JSON.stringify(json, null, 2)}
</pre>
